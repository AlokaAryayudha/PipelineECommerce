pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup ENV') {
            steps {
                // Ambil file .env dari Jenkins credentials → copy ke workspace
                withCredentials([file(credentialsId: 'ecommerce-env', variable: 'ENV_FILE')]) {
                    bat 'copy %ENV_FILE% .env'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

    }

    post {
        always {
            echo 'Pipeline selesai!'
        }
        failure {
            echo 'Ada test yang gagal!'
        }
    }
}