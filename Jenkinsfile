pipeline {
    agent any

    stages {
        stage('Build and test') {
            steps {
                sh 'mvn clean verify'
            }
        }
    }

    post {
        always {
            junit 'target/surefire-reports/*.xml'
        }
    }
}
