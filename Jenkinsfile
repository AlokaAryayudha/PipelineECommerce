pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                withCredentials([file(credentialsId: 'ecommerce-env', variable: 'ENV_FILE')]) {
                    bat 'copy %ENV_FILE% .env'
                    bat 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline selesai!'
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])

            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
        }
        success {
            echo 'Semua test PASSED!'
        }
        failure {
            echo 'Ada test yang FAILED!'
        }
    }
}