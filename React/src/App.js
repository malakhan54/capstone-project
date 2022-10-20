import NavLinks from './NavLinks';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherApp from './WeatherApp';


function App() {
  return (
    <div className="container fluid">
      <h1 className="display-5 text-info text-uppercase bg-dark text-center bg-gradient p-2">Konnect: Weather Forecast App</h1>

      <NavLinks />

    </div>
  );
}

export default App;
