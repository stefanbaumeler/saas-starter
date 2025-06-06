import { Alert, AlertDescription, AlertTitle } from '@saas-starter/ui/Alert'
import { AlertCircle } from 'lucide-react'

type Props = {
    error?: string
}

export const AuthError = ({
    error
}: Props) => {
    return error ? <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>
            Error
        </AlertTitle>
        <AlertDescription>
            {error}
        </AlertDescription>
    </Alert> : null
}
