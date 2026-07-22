pipeline {
    agent {
        docker {
            image 'maven:3.9.9-eclipse-temurin-17'
            args '-v maven-repo:/root/.m2'
        }
    }

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
            recordIssues tool: spotBugs(pattern: 'target/spotBugsXml.xml')
        }
    }
}
