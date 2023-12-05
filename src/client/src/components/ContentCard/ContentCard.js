

const ContentCard = (props) => {

    return (
      <div className="max-w-sm mx-auto mt-10 p-10 bg-white rounded-lg shadow-lg">
          <div className="card-body">
            <h5 className="text-xl font-semibold mb-2">{props.author}</h5>

            <a href={props.url} target="_blank" className="text-sm text-blue-600 mb-2">{props.url}</a>

          </div>
        </div>
    );
  };
  
  export default ContentCard;
  