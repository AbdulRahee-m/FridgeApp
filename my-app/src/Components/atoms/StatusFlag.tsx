

function StatusFlag({ className, content }: { className?: string; content: string }) {
  return (
     <span
                  className={className}
                >
                  {content}
                </span>
  )
}

export default StatusFlag