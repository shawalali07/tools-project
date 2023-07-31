import "./skeleton.css";

const Skeleton = ({ type }) => {
  const CHART = 1;

  const ChartSkeleton = () => (
    <div className="charkSkeleton">
      <div className="sk">
        {Array(33)
          .fill()
          .map((_, index) => (
            <div className={`sk-bar${index + 1}`} key={index}></div>
          ))}
      </div>
      <div className="sk-chartHeader">
        <p className="sk-chartHeader-crypto"></p>
        <div className="sk-currency"></div>
        <div className="sk-divider"></div>
        <div className="sk-currency"></div>
        <p className="sk-chartHeader-crypto"></p>
      </div>
    </div>
  );

  if (type === "chart") return Array(CHART).fill(<ChartSkeleton />);
};

export default Skeleton;
