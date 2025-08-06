export default function TeamInfo({ groups, clients, members }) {
  if (!groups) return <div>Loading...</div>;
  if (groups.length === 0) return <div>Tidak ada group.</div>;

  const filteredGroups = groups.filter((x) => x.id != 1);
  const lgGridCols = filteredGroups.length % 3 === 0 ? 3 : 4;

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${lgGridCols} gap-2`}
    >
      {filteredGroups.map((group) => (
        <div
          key={group.id}
          className="rounded-xl border p-2 shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
          <div className="flex flex-row justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 text-sm text-gray-400 font-thin">
              Clients
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 font-thin">
              {clients.filter((c) => c.team === group.id).length}
            </div>
          </div>
          <div className="flex flex-row justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 text-sm text-gray-400 font-thin">
              Members
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 font-thin">
              {
                members.filter((m) => m.group_id === group.id && m.status === 1)
                  .length
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
