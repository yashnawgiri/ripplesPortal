import UserNavBar from "@/components/userNavbar";


export default function UserDefaultLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col items-center h-fit bg-custom-radial">
            <UserNavBar/>
            <div className="center-parent-container">
                <main className="flex-grow items-center min-h-screen pt-28">{children}</main>
            </div>
        </div>
    );
}
