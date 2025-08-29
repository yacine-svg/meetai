import { EmptyState } from "@/components/empty-state"

export const CanceledState = () => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
            <EmptyState 
            image="/canceled.svg"
            title="Meeting canceled"
            description="This meeting has been cancelled."
            />
        </div>
    )
}