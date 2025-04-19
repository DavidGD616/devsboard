import { formatRelativeDate } from "@/lib/dateUtils";
import Link from "next/link";

export default function JobCard({ job }) {
    return (
        <div className="bg-white rounded-lg p-4 md:p-6 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-start shadow-sm hover:shadow-md transition-shadow mb-4">
            {/* Left - Company Image */}
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                {job.img ? (
                    <img src={job.img} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-200" />
                )}
            </div>

            {/* Middle - Main Content */}
            <div className="min-w-0">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-600 mb-3">
                    <span>{job.company}</span>
                    <span>{job.city}</span>
                    {job.remote_ok && <span className="text-green-600">Remote</span>}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {job.stack_required.map((tech, index) => (
                        <span 
                            key={index}
                            className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Bottom Info */}
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-500">
                    <span>{formatRelativeDate(job.date)}</span>
                    <span>from {job.source}</span>
                    {job.salary_min && job.salary_max && 
                     Number(job.salary_min) !== -1 && 
                     Number(job.salary_max) !== -1 && (
                        <span className="font-medium">
                            ${Number(job.salary_min).toLocaleString()} - ${Number(job.salary_max).toLocaleString()}
                        </span>
                    )}
                </div>
            </div>

            {/* Right - Action Button */}
            <div className="justify-self-stretch md:justify-self-end self-center">
                <Link href={job.url} target="_blank" rel="noopener noreferrer">
                    <button className="w-full md:w-auto px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        View Job
                    </button>
                </Link>
            </div>
        </div>
    );
}