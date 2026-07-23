pipeline {
    agent {
        docker {
            image 'maven:3.9.9-eclipse-temurin-17'
            args '-v maven-repo:/home/ubuntu/.m2'
        }
    }

    stages {
        stage('Build and test') {
            steps {
                withCredentials([string(credentialsId: 'nvd-api-key', variable: 'NVD_API_KEY')]) {
                    sh 'mvn clean verify -Dnvd.api.key=$NVD_API_KEY'
                }

            }
        }

        stage('Docker build') {
            agent { label 'built-in' }
            steps {
                sh "docker build -t diecocan-tools:${env.GIT_COMMIT} ."
            }
        }
    }

    post {
        always {
            junit 'target/surefire-reports/*.xml'
            recordIssues tool: spotBugs(pattern: 'target/spotbugsXml.xml')
        }
    }
}
