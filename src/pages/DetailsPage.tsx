import Header from '../components/Header';
import DetailsForm from '../components/DetailsForm';

const DetailsPage = () => {
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <DetailsForm />
      </main>
    </div>
  );
};

export default DetailsPage;