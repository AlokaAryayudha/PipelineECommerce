pipeline {
    agent any



    environment {
        BASE_URL      = 'https://automationexercise.com'
        USER_EMAIL    = credentials('ecommerce-env')
        API_BASE_URL  = 'https://automationexercise.com/api'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
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