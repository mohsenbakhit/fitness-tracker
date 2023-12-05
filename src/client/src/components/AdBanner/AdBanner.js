const AdBanner = (props) => {
  return (
    <>
    <div className="h-40"></div>
    <a href={props.href}>
    <div className="w-full text-center fixed bottom-0 bg-slate-100 p-4">
      <h1 className="">{props.title}</h1>
      <p className="text-slate-400 text-sm">(become a paid user to remove ads)</p>
    </div>
    </a>
    </>
  );
};

export default AdBanner;
