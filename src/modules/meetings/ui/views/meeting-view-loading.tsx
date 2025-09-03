import { LoadingState } from "@/components/loading-state"

export const MeetingsViewLoading = () => {
    return (
        <LoadingState
                title="Loading Meeting"
                description="This may take a few seconds."
        />
    )
}