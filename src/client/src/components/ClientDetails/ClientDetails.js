const ClientDetails = (props) => {
  return (
    <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg border-4 border-black rounded-md shadow-md">
      <div className="card-body">
        <h5 className="text-xl font-semibold mb-2">{props.name}</h5>
        <h6 className="text-sm text-gray-600 mb-1">{props.email}</h6>
        <p className="text-sm text-gray-700 mb-1">{props.location}</p>
      </div>
    </div>
  );
};

export default ClientDetails;
