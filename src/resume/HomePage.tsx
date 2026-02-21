import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="resume-home">
      <h1 className="resume-home-headline">Build a Resume That Gets You Hired</h1>
      <p className="resume-home-sub">
        Create a professional, ATS-optimized resume with our intelligent builder.
        Stand out from the crowd with clean design and smart formatting.
      </p>
      <Link to="/builder" className="resume-home-cta">
        Start Building →
      </Link>
    </div>
  );
}
