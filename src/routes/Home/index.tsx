import Header from "../../components/Header";
import MusicCollections from "../../components/MusicCollections";
import "./styles.css";

const Home = () => {
  return (
    <div className="home-container">
      <Header title="Overview" />
      <div className="content">
        <MusicCollections />
      </div>
    </div>
  );
};

export default Home;
