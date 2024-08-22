import UserNavBar from "@/components/userNavbar";


export default function UserDefaultLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col items-center h-fit bg-custom-radial">
            <UserNavBar />
            <div className="center-parent-container min-h-screen">
                <main className="flex-grow items-center mt-24 sm:ml-72">{children}</main>
            </div>
        </div>
    );
}
