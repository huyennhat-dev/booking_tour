import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';

const Account = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Account" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      </div>
    </DefaultLayout>
  );
};

export default Account;
