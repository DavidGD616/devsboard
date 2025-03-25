import { formatRelativeDate } from "@/lib/dateUtils";
import Link from "next/link";

export default function JobCard({ job }) {
    return (
        <div className="bg-white rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center shadow-sm hover:shadow-md transition-shadow mb-4">
            {/* Left - Company Image */}
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {job.img ? (
                    <img src={job.img} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-200" />
                )}
            </div>

            {/* Middle - Main Content */}
            <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-600 mb-3">
                    <span>{job.company}</span>
                    <span>{job.city}</span>
                    {job.remoteOk && <span className="text-green-600">Remote</span>}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {job.stackRequired.map((tech, index) => (
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
                    {job.salaryMin && job.salaryMax && 
                     Number(job.salaryMin.$numberInt) !== -1 && 
                     Number(job.salaryMax.$numberInt) !== -1 && (
                        <span className="font-medium">
                            ${Number(job.salaryMin.$numberInt).toLocaleString()} - ${Number(job.salaryMax.$numberInt).toLocaleString()}
                        </span>
                    )}
                </div>
            </div>

            {/* Right - Action Button */}
            <div className="w-full md:w-auto flex items-center justify-center md:self-center">
                <Link href={job.url} target="_blank" rel="noopener noreferrer">
                    <button className="w-full md:w-auto px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        View Job
                    </button>
                </Link>
            </div>
        </div>
    );
}