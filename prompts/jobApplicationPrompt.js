class jobApplicationPrompt {
    constructor(emailSubject, keywords) {

        this.emailSubject = emailSubject
        this.keywords = keywords

        this.title = "Job Application"
        this.slug = "job-application-prompt"
        this.id = "3"
        this.maxTokens = 250
        this.updatedOn=1658382267
        
        this.shortDescription="An email for job application"
        this.iconUrl="https://img.icons8.com/external-sbts2018-lineal-color-sbts2018/58/000000/external-speaker-ecommerce-basic-1-sbts2018-lineal-color-sbts2018.png"
        this.description="An email for job application as a fresher/experienced. Use this prompt to apply for a job position as a fresher or experienced personnel. In the Subject, mention the role you're applying for.\nIn the keywords write about your academices, internship/job experiences acheievements, projects."

    }

    setSubjectAndKeywords(emailSubject, keywords) {
        this.emailSubject = emailSubject
        this.keywords = keywords
        this.promptText = `
        This is a mail generator\n1.Subject: Software Developer Job Application,\nkeywords: Software Developer, Job Application, Fresher, JavaScript, excellent employee, team player, hardworking\n\nRespected Entity,\nYour job posting on LinkedIn for the role of a Software Developer caught my interest. As a recent graduate from New York University with a background in Computer Science, I believe my tenacity and educational experience align with the job description.\nWhile maintaining a 9.0 GPA throughout my undergrad, I also took on various summer internships. In particular, my internship at Google allowed me to develop the foundational skills for a successful programming career.\nI have also developed variouos projects as the following:\n1. B2B Ecommerce Application: A mobile app for B2B e-commerce sale. Tech used: Flutter, NodeJS, JavaScript\n2. Portfolio Website: A personal portfolio using HTML, CSS, JavaScript, BootStrap\nIncluded in the email are my resume and cover letter which reflect my work and educational experience. Please reach back if you have any questions. Thank you for taking the time to go through my application. I hope to hear from you soon.\n\nYours Faithfully,\nJamie Arnold\n\n2.Subject:Application for Senior Software Developer,keywords:senior developer, 5 years of experience, excellent employee, team player, hardworking\n\nHello Students,\nWe regret to inform you that an extra lecture has been scheduled for Sunday, September 9th at 9am in order to make up for any material that may have been missed in the previous lectures. This is a compulsory attendance lecture and all students are expected to be in attendance.\nWe hope that this inconvenience will not cause too much trouble for you and that you can still make it to all of the other lectures scheduled for this term.\nThank you for your cooperation.\nSincerely,The Faculty &&&&Mail Sentiment: Negative&&&&\n3.Subject: ${this.emailSubject},keywords: ${this.keywords}
`

    }

}

module.exports = jobApplicationPrompt