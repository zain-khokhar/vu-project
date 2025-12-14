import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "Are these quizzes free?",
        answer: "Yes! All quizzes on VUEDU are completely free to access and use. You can take as many quizzes as you want without any cost."
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

export default function QuizFAQ() {
    return (
        <section className="relative py-16">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <div className="bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg">
                            <span className="text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
                                COMMON QUESTIONS
                            </span>
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-light text-gray-900 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 font-light">
                        Everything you need to know about our quiz system
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }) {
    return (
        <details className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
                <span className="text-lg font-semibold text-gray-900 pr-4">
                    {question}
                </span>
                <ChevronDown
                    className="h-5 w-5 text-indigo-600 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                />
            </summary>

            <div className="px-6 pb-5 pt-2">
                <p className="text-gray-700 leading-relaxed">
                    {answer}
                </p>
            </div>
        </details>
    );
}
