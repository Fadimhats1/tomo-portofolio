import MainContent from '../components/organisms/MainContent';
import IconBadge from '../components/atoms/IconBadge';
import ResumeCard from '../components/molecules/ResumeCard';
import { educationData, experienceData } from '../utils/data/resumes';

const Resume = () => {
    return (
        <MainContent title="Resumes">
            {/* Education */}
            <div>
                <div className="mb-8 flex w-fit items-center gap-3">
                    <IconBadge name="GraduationCap" wrapperProps={{ className: 'p-1 rounded-lg' }} />
                    <h3 className="text-apple-label-primary text-2xl font-bold">Education</h3>
                </div>
                <div>
                    {[...educationData]
                        .sort((a, b) => (b.endYear ?? new Date().getFullYear()) - (a.endYear ?? new Date().getFullYear()))
                        .map((item, idx) => (
                            <ResumeCard
                                cardClassName="border border-transparent hover:border hover:border-apple-blue transition-all duration-300 hover:bg-apple-blue/25"
                                key={item.title}
                                title={item.title}
                                startYear={item.startYear}
                                endYear={item.endYear}
                                gpa={item.gpa}
                                records={
                                    Array.isArray(item.records)
                                        ? item.records
                                        : Object.entries(item.records).map(([key, records]) => (
                                              <div key={key}>
                                                  <h5 className="text-apple-label-primary mb-1 font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                                                  <ul className="text-apple-label-secondary ml-2.5 list-disc pl-4">
                                                      {records.map((r, i) => (
                                                          <li key={i}>
                                                              {r.role} ({r.startYear} - {r.endYear ?? 'Present'})
                                                          </li>
                                                      ))}
                                                  </ul>
                                              </div>
                                          ))
                                }
                                isLast={idx === educationData.length - 1}
                            />
                        ))}
                </div>
            </div>

            {/* Experience */}
            <div>
                <div className="mb-8 flex w-fit items-center gap-3">
                    <IconBadge name="Briefcase" wrapperProps={{ className: 'p-1 rounded-lg' }} />
                    <h3 className="text-apple-label-primary text-2xl font-bold">Experience</h3>
                </div>
                <div>
                    {[...experienceData]
                        .sort((a, b) => (b.endYear ?? new Date().getFullYear()) - (a.endYear ?? new Date().getFullYear()))
                        .map((item, idx) => (
                            <ResumeCard
                                cardClassName="border border-transparent hover:border hover:border-apple-blue transition-all duration-300 hover:bg-apple-blue/25"
                                key={item.title}
                                title={item.title}
                                startYear={item.startYear}
                                endYear={item.endYear}
                                records={
                                    Array.isArray(item.records)
                                        ? item.records
                                        : Object.entries(item.records).map(([key, records]) => (
                                              <div key={key}>
                                                  <h5 className="text-apple-label-primary mb-1 font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                                                  <ul className="text-apple-label-secondary ml-2.5 list-disc pl-4">
                                                      {records.map((r, i) => (
                                                          <li key={i}>
                                                              {r.role} ({r.startYear} - {r.endYear ?? 'Present'})
                                                          </li>
                                                      ))}
                                                  </ul>
                                              </div>
                                          ))
                                }
                                isLast={idx === experienceData.length - 1}
                            />
                        ))}
                </div>
            </div>
        </MainContent>
    );
};

export default Resume;
