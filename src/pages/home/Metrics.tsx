import { useEffect, useState } from "react";
import { Card, Progress, Spinner } from "flowbite-react";
import { watcherService, IMetricDto } from "@services/watcher/watcher";

interface IMetricCard {
  title: string;
  count: number;
  progress: number;
  loading: boolean;
}

function MetricCard({ title, count, progress, loading }: IMetricCard) {
  return (
    <Card className="bg-cardBg hover:bg-cardBg text-cardColor border-cardColor">
      <div className="flex flex-row justify-between items-center">
        <h5 className="text-sm font-bold tracking-tight text-textColor">
          {title}
        </h5>

        {loading ? (
          <Spinner size="sm" />
        ) : (
          <span className="font-bold text-3xl">{count}</span>
        )}
      </div>
      <Progress size="sm" progress={progress} />
    </Card>
  );
}

export function Metrics() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<IMetricDto | null>(null);

  const fetchMetrics = async () => {
    const _metrics = await watcherService.getStats();
    setIsLoading(false);
    setMetrics(_metrics);
    console.log(metrics);
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <MetricCard
          title="AIDS"
          count={metrics?.aids ?? 0}
          progress={metrics?.aids ? 100 : 0}
          loading={isLoading}
        />
        <MetricCard
          title="Witnesses"
          count={metrics?.witnesses ?? 0}
          progress={metrics?.witnesses ? 100 : 0}
          loading={isLoading}
        />
        <MetricCard
          title="Key Events"
          count={metrics?.keyEventsTotal ?? 0}
          progress={metrics?.keyEventsTotal ? 100 : 0}
          loading={isLoading}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <MetricCard
          title="Cardano Aids"
          count={metrics?.cardanoAids ?? 0}
          progress={
            metrics?.cardanoAids
              ? (metrics?.cardanoAids / metrics?.aids) * 100
              : 0
          }
          loading={isLoading}
        />
        <MetricCard
          title="Witness Availability"
          count={metrics?.witnessesAvailability ?? 0}
          progress={
            metrics?.witnessesAvailability
              ? (metrics?.witnessesAvailability / metrics?.witnesses) * 100
              : 0
          }
          loading={isLoading}
        />
        <MetricCard
          title="Key Events Mean"
          count={metrics?.keyEventsMean ?? 0}
          progress={
            metrics?.keyEventsMean
              ? (metrics?.keyEventsMean / metrics?.keyEventsTotal) * 100
              : 0
          }
          loading={isLoading}
        />
      </div>
    </>
  );
}
