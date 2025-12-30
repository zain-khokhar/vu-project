export function generateFAQSchema() {
    const faqs = [
        {
            question: "Are these quizzes free?",
            answer: "Yes! All quizzes on Vuedu are completely free to access and use. You can take as many quizzes as you want without any cost."
        },
        {
            question: "What if I can't find my subject?",
            answer: "First, try searching by entering your course code (e.g., CS101, MTH202). If that doesn't work, try entering the first name of your subject. Still can't find it? Contact us anywhere and we'll help you out!"
        },
        {
            question: "How do the quizzes work?",
            answer: "Our quizzes feature timed questions with multiple-choice answers. Each quiz is randomized to provide a fresh experience every time. You'll receive instant feedback and detailed explanations after completing the quiz."
        },
        {
            question: "Can I request a custom quiz for my subject?",
            answer: "Absolutely! If you want a quiz for a specific subject or need to convert your hardcopy quiz into an interactive format, please contact us. We'll be happy to create a customized quiz tailored to your needs."
        },
        {
            question: "Can I provide feedback on quiz results?",
            answer: "Yes! At the end of each quiz, you can provide feedback on the questions, difficulty level, and overall experience. Your feedback helps us improve the quality of our quizzes."
        },
        {
            question: "Are the quizzes customizable?",
            answer: "Yes, our quizzes are fully customizable. We can adjust the difficulty level, number of questions, time limits, and question types based on your requirements. Contact us to discuss your specific needs."
        },
        {
            question: "Can I retake a quiz?",
            answer: "Yes, you can retake any quiz as many times as you like. Questions are randomized each time, so you'll get a different experience with every attempt, helping reinforce your learning."
        }
    ];

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

export function generateBreadcrumbSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://vuedu.dev"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Quiz",
                "item": "https://vuedu.dev/quiz"
            }
        ]
    };
}

export function generateWebPageSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Online Quiz System - Test Your Knowledge | Vuedu",
        "description": "Access interactive online quizzes across multiple categories. Test your knowledge with timed questions, instant feedback, and detailed explanations.",
        "url": "https://vuedu.dev/quiz",
        "publisher": {
            "@type": "Organization",
            "name": "Vuedu",
            "url": "https://vuedu.dev"
        }
    };
}
