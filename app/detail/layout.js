import { Suspense } from "react";

export default function DetailLayout({ children }) {
    return (<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>);
}
