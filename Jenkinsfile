pipeline {
    agent none

    stages {
        stage('Build and test') {
            agent {
                docker {
                    image 'maven:3.9.9-eclipse-temurin-17'
                    args '-v maven-repo:/home/ubuntu/.m2'
                }
            }
            steps {
                withCredentials([string(credentialsId: 'nvd-api-key', variable: 'NVD_API_KEY')]) {
                    sh 'mvn clean verify -Dnvd.api.key=$NVD_API_KEY'
                }

            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                    recordIssues tool: spotBugs(pattern: 'target/spotbugsXml.xml')
                }
            }
        }

        stage('Docker build') {
            agent { label 'built-in' }
            steps {
                withCredentials([usernamePassword(credentialsId: 'ghcr-pat', usernameVariable: 'GHCR_USER', passwordVariable: 'GHCR_TOKEN')]) {
                    sh """
                        docker build -t ghcr.io/diecocan/diecocan-tools:${env.GIT_COMMIT} .
                        echo \$GHCR_TOKEN | docker login ghcr.io -u \$GHCR_USER --password-stdin
                        docker push ghcr.io/diecocan/diecocan-tools:${env.GIT_COMMIT}
                    """
                }
            }
        }

        stage('Deploy to staging') {
            agent { label 'built-in' }
            steps {
                sh """
                    docker stop diecocan-tools-staging || true
                    docker rm diecocan-tools-staging || true
                    docker run -d --name diecocan-tools-staging -p 8090:8080 ghcr.io/diecocan/diecocan-tools:${env.GIT_COMMIT}
                """
                sh '''
                    sleep 10
                    curl -sf http://host.docker.internal:8090/v1/owners
                '''
            }
        }

        stage('Approval') {
            steps {
                input message: 'Promote this build to production?', ok: 'Deploy to production'
            }
        }

        stage('Deploy to production') {
            agent { label 'built-in' }
            steps {
                sh """
                    docker stop diecocan-tools-prod || true
                    docker rm diecocan-tools-prod || true
                    docker run -d --name diecocan-tools-prod -p 8091:8080 ghcr.io/diecocan/diecocan-tools:${env.GIT_COMMIT}
                """
                sh '''
                    sleep 10
                    curl -sf http://host.docker.internal:8091/v1/owners
                '''
            }
        }
    }
}
