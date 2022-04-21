pipeline {
    agent any
    triggers { // https://www.jenkins.io/doc/book/pipeline/syntax/#triggers
        cron("0 0 * * *") // https://en.wikipedia.org/wiki/Cron + https://crontab.guru/ 
    }
    environment {
        TIMESTAMP = sh(script: "date +%s", returnStdout: true).trim()
        SCREENSHOT_PATH = "screenshots/${TIMESTAMP}"
    }
    stages {
        stage("Build UI") {
            steps {
                dir("src/Blogifier") {
                    sh "dotnet publish Blogifier.csproj -o ../../outputs"
                }
            }
        }
        stage("Performance testing") {
            steps {
                sh 'k6 run performancetest/performance-test.js'
            }
        }
        stage("Reset test environment") {
            steps {
                sh "docker-compose down"
                sh "docker-compose up -d --build"
                sh "mkdir -p ${SCREENSHOT_PATH}"
                sh "chmod a=rwx ${SCREENSHOT_PATH}"
            }
        }
        stage("Execute UI tests") {
            steps {
                sh "docker run -v /var/lib/jenkins/workspace/Blogifier/testcafe/:/tests -t testcafe/testcafe chromium /tests/*.js"

            }
            post {
                always {
                    archiveArtifacts artifacts: "${SCREENSHOT_PATH}/**", allowEmptyArchive: true
                }
            }
        }
    }
}