interface Props {
  queueNumber: string
  patientType: string
  scheduleDate: string
}

export default function QueueDisplay({ queueNumber, patientType, scheduleDate }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col items-center justify-center gap-2">
      <div className="w-32 h-32 rounded-full bg-green-50 flex items-center justify-center">
        <span className="text-3xl font-bold text-green-800">{queueNumber}</span>
      </div>
      <p className="font-semibold text-gray-800 mt-2">Antrean Anda</p>
      <p className="text-sm text-gray-500">{patientType} - {scheduleDate}</p>
    </div>
  )
}