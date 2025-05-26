export default function AlertMessage({ title, message }: { title: string; message: string }) {
    return (
        <div>
            <strong>{title}</strong>
            <div>{message}</div>
        </div>
    )
}