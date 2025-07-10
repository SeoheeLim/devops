pipeline {
    agent any

    environment {
        FRONT_IMAGE = "react-app"
        FRONT_CONTAINER = "react-app-container"
        FRONT_PORT = "80"

        BACK_IMAGE = "backend-app"
        BACK_CONTAINER = "backend-container"
        BACK_PORT = "8000"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $FRONT_IMAGE .'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $BACK_IMAGE .'
                }
            }
        }

        stage('Deploy Frontend Container') {
            steps {
                script {
                    sh "docker rm -f $FRONT_CONTAINER || true"
                    sh "docker run -d -p ${FRONT_PORT}:80 --name $FRONT_CONTAINER $FRONT_IMAGE"
                }
            }
        }

        stage('Deploy Backend Container') {
            steps {
                script {
                    sh "docker rm -f $BACK_CONTAINER || true"
                    sh "docker run -d -p ${BACK_PORT}:80 --name $BACK_CONTAINER $BACK_IMAGE"
                }
            }
        }

        stage('Check Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ 배포 성공!'
        }
        failure {
            echo '❌ 배포 실패!'
        }
    }
}
