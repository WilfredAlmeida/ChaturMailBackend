class requestPrompt {

    constructor(emailSubject, keywords) {

        this.emailSubject = emailSubject
        this.keywords = keywords

        this.title = "Request"
        this.slug = "request-prompt"
        this.id = "1"
        this.maxTokens = 250
        this.updatedOn=1652450638
        
        this.shortDescription="An email to request something"
        this.iconUrl="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/000000/external-avatar-design-thinking-kmg-design-detailed-outline-kmg-design.png"
        this.description="An email to request something"

    }

    setSubjectAndKeywords(emailSubject, keywords) {
        this.emailSubject = emailSubject
        this.keywords = keywords

        this.promptText = `
This is a mail generator\n1.Subject: Vacation request for September, 10-15\nkeywords: Current Projects & Pending Tasks, Vacation Request\n\nDear, John Doe\nI would like to request vacation from Monday, September 9th till Friday, September 13th.I will make sure to complete all my current projects and pending tasks in advance before the vacation. Ravi and John will cover my responsibilities during my absence.\nLooking forward to your approval.\n\nSincerely,\nWilfred Almeida[Job title]\n&&&&Mail Sentiment: Neutral&&&&\n####\n\n2.\nSubject: Do you have student discounts for the Annual Coding Conference?\nkeywords: discount ,education,student ,coding,annual\n\nGreetings John Doe\nI would like to ask if you provide student discounts for tickets to the Annual Coding Conference.A full-time student at the University of Texas and very excited about your event, but unfortunately, the ticket price is too high for me. I would appreciate if you could offer me an educational discount.\nLooking forward to hearing from you!\n\nBest,\nWilfred Almeida &&&&Mail Sentiment: Negative&&&&\n####\n\n3 Subject: ${this.emailSubject}\nkeywords:${this.keywords}
`

    }

}

module.exports = requestPrompt