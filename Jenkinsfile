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
                sh "docker build -t diecocan-tools:${env.GIT_COMMIT} ."
            }
        }
    }
}
