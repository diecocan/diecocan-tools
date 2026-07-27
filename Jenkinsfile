@Library('fraud-pipeline-lib') _

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
                mavenBuildAndTest()
            }
            post {
                always {
                    mavenBuildAndTestReport()
                }
            }
        }

        stage('Docker build') {
            agent { label 'built-in' }
            steps {
                dockerBuildAndPush(image: 'ghcr.io/diecocan/diecocan-tools')
            }
        }

        stage('Deploy to staging') {
            agent { label 'built-in' }
            steps {
                deployContainer(
                    name: 'diecocan-tools-staging',
                    image: "ghcr.io/diecocan/diecocan-tools:${env.GIT_COMMIT}",
                    ports: '-p 8090:8080'
                )
                verifyHttp(sleepSeconds: 10, urls: ['http://host.docker.internal:8090/v1/owners'])
            }
        }

        stage('Approval') {
            steps {
                approvalGate()
            }
        }

        stage('Deploy to production') {
            agent { label 'built-in' }
            steps {
                deployContainer(
                    name: 'diecocan-tools-prod',
                    image: "ghcr.io/diecocan/diecocan-tools:${env.GIT_COMMIT}",
                    ports: '-p 8091:8080'
                )
                verifyHttp(sleepSeconds: 10, urls: ['http://host.docker.internal:8091/v1/owners'])
            }
        }
    }
}
