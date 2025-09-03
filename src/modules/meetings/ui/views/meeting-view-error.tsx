import { ErrorState } from "@/components/error-state"

export const MeetingsViewError = () => {
    return (
        <ErrorState
                title="Error Load Meeting"
                description="There was an error fetching the agents. Please try again later."
        />
    )
}