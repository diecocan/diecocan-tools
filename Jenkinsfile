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
                         echo \$GHCR_TOKEN | docker login ghcr.io -u \$GHCR_USER --password-stdin
                         docker buildx build --platform linux/amd64 -t ghcr.io/diecocan/diecocan-tools:${env.GIT_COMMIT} --push .
                     """
                }
            }
        }

        stage("Deploy to Fly.io (staging)") {
            agent { label 'built-in' }
            steps {
                withCredentials([string(credentialsId: 'fly-api-token', variable: 'FLY_API_TOKEN')]) {
                    sh "flyctl deploy --image ghcr.io/diecocan/diecocan-tools:${env.GIT_COMMIT} -a diecocan-tools-staging --now"
                }
                sh '''
                    sleep 10
                    curl -sf https://diecocan-tools-staging.fly.dev/v1/owners
                '''
            }
        }
    }
}
