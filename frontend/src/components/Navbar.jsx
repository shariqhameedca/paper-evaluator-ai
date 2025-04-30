import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/create" style={{ marginRight: '10px' }}>Create Evaluation</Link>
            <Link to="/upload" style={{ marginRight: '10px' }}>Upload Answers</Link>
        </nav>
    );
}

export default Navbar;
