interface GrowthData {
    month: string;
    members: number;
  }
  
  interface MemberGrowthChartProps {
    data: GrowthData[];
  }
  
  export default function MemberGrowthChart({ data }: MemberGrowthChartProps) {
    const maxMembers = Math.max(...data.map(d => d.members));
  
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Member Growth</h3>
  
        <div className="h-64">
          <div className="h-full flex items-end justify-between gap-3">
            {data.map((item, index) => {
              const height = (item.members / maxMembers) * 100;
              const growth = index > 0 ? item.members - data[index - 1].members : 0;
  
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full h-full flex flex-col justify-end">
                    {growth > 0 && (
                      <div className="text-xs text-green-600 font-medium text-center mb-1">
                        +{growth}
                      </div>
                    )}
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition-colors cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${item.members.toLocaleString()} members`}
                    />
                  </div>
                  <div className="text-xs text-gray-600 mt-2">{item.month}</div>
                </div>
              );
            })}
          </div>
        </div>
  
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm">
          <div>
            <span className="text-gray-600">Total Members:</span>
            <span className="font-bold text-gray-900 ml-2">
              {data[data.length - 1].members.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Growth Rate:</span>
            <span className="font-bold text-green-600 ml-2">
              +{Math.round(((data[data.length - 1].members - data[0].members) / data[0].members) * 100)}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  