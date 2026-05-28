pipeline {
    agent any

    triggers {
        githubPush() // auto trigger setiap push ke GitHub
    }

    environment {
        CI = 'true' // headless mode
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup ENV') {
            steps {
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
                bat 'npx playwright test --reporter=html'
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
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