const Mainpage = ({ message }) => {
  return (
    <div className="start-page">
      <div className="main-content">
        <h1>Witaj</h1>
        <h1>{message}</h1>
      </div>
    </div>
  );
};

export default Mainpage;
