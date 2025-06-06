type Props = {
    code?: string
}

export const AuthBackupCode = ({
    code
}: Props) => {
    return code ? <span className="font-mono font-bold text-lg">
        {code}
    </span> : <span className="w-[120px] flex items-center">
        <span className="w-full h-0.5 bg-neutral-300" />
    </span>
}
