export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="bg-btn-background hover:bg-btn-background-hover rounded-md px-4 py-2 no-underline">
        Logout
      </button>
    </form>
  );
}
