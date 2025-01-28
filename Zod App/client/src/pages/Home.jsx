import React, { useEffect, useState } from 'react';

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/form/view-all-form');
                if (!response.ok) throw new Error('Failed to fetch data');

                const result = await response.json();
                console.log('Fetched data:', result); // Debugging
                setData(result.data); // Extract the 'data' array
            } catch (err) {
                console.error('Fetch error:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Form Submissions</h1>

            <div className="space-y-4">
                {data.length === 0 ? (
                    <p className="text-center text-gray-600">No data found.</p>
                ) : (
                    data.map((item, index) => (
                        <div
                            key={item._id} // Use unique '_id' for the key
                            className="bg-white rounded-lg p-6 shadow-lg border border-gray-200"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <span className="font-bold">First Name:</span> {item.firstName}
                                </div>
                                <div>
                                    <span className="font-bold">Last Name:</span> {item.lastName}
                                </div>
                                <div>
                                    <span className="font-bold">Email:</span> {item.email}
                                </div>
                                <div>
                                    <span className="font-bold">Phone:</span> {item.phone}
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="font-bold">Message:</span> {item.message}
                            </div>
                            <div className="mt-2">
                                <span className="font-bold">Date:</span>{' '}
                                {new Date(item.date).toLocaleDateString()}
                            </div>
                            <div className="mt-2">
                                <span className="font-bold">Description:</span> {item.description}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
