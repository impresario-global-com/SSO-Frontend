import CommonLayout from "@/layouts/common-layout.tsx";
import AppError from "@/components/shared/app-error.tsx";


export function Component() {
    return (
        <CommonLayout>
            <div className="m-auto">
                <AppError />
            </div>
        </CommonLayout>
    )
}