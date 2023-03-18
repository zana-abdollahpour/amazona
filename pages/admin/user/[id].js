import Link from "next/link";

import Layout from "../../../components/Layout";

export default function UserEditScreen() {
  return (
    <Layout title="Admin Dashboard">
      <div className="flex flex-col items-center justify-center mt-16">
        <p className="pb-4">This Page is NOT implemented yet...</p>
        <Link href="/admin/dashboard" className="primary-button">
          Go back to Dashboard
        </Link>
      </div>
    </Layout>
  );
}

UserEditScreen.auth = { adminOnly: true };
