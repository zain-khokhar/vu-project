import Link from 'next/link';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function QuizCTA() {
    return (
        <section className="relative py-8 md:py-16">
            <div className="max-w-5xl mx-auto">
                {/* CTA Card */}
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6 md:p-12 shadow-2xl">

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex flex-col items-center text-center gap-6 md:gap-8">

                            {/* Content */}
                            <div className="w-full">
                                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-3 md:mb-4">
                                    <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white">
                                        Custom Solutions
                                    </span>
                                </div>

                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight">
                                    Need a Custom Quiz?
                                </h2>

                                <p className="text-base md:text-lg text-indigo-100 leading-relaxed mb-2 max-w-2xl mx-auto">
                                    Want to convert your hardcopy quiz into an interactive format?
                                </p>
                                <p className="text-sm md:text-base text-indigo-100 leading-relaxed max-w-2xl mx-auto">
                                    We can create customized quizzes tailored to your specific subject or requirements. Get in touch with us today!
                                </p>
                            </div>

                            {/* CTA Button */}
                            <div className="w-full md:w-auto">
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center justify-center gap-2 md:gap-3 bg-white text-indigo-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full md:w-auto text-sm md:text-base"
                                >
                                    <Mail className="h-4 w-4 md:h-5 md:w-5" />
                                    <span>Contact Us</span>
                                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
