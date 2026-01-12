"use client";

// REVIEWED - 06

import { BarChart3Icon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import colors from "tailwindcss/colors";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Paragraph, SubSectionHeading } from "../globals/typography";

const chartConfig = {
  comments: {
    label: "Comments",
    color: colors.green["200"],
  },
  diary: {
    label: "Diary Entries",
    color: colors.green["500"],
  },
  orders: {
    label: "Orders",
    color: colors.green["800"],
  },
};

export const ProfileStatistics = function ProfileStatistics({
  isPublicProfile = false,
  stats,
}: {
  isPublicProfile?: boolean;
  stats: {
    id: number;
    type: "comment" | "diary-entry" | "order";
    createdAt: string;
  }[];
}) {
  const [offsetMonth, setOffsetMonth] = useState(0);
  const [monthsToShow, setMonthsToShow] = useState(6);

  // Adjust number of months based on screen size
  useEffect(() => {
    const updateMonthsToShow = () => {
      if (window.innerWidth < 640)
        // Mobile: show 3 months
        setMonthsToShow(3);
      else if (window.innerWidth < 1024)
        // Tablet: show 4 months
        setMonthsToShow(4);
      // Desktop: show 6 months
      else setMonthsToShow(6);
    };

    updateMonthsToShow();
    window.addEventListener("resize", updateMonthsToShow);
    return () => window.removeEventListener("resize", updateMonthsToShow);
  }, []);

  const chartData = useMemo(() => {
    // Group activities by month based on monthsToShow and offset
    const months: Record<
      string,
      { comments: number; diary: number; orders: number }
    > = {};

    const now = new Date();
    const startMonth = now.getMonth() - offsetMonth;
    const startYear = now.getFullYear();

    // Calculate starting month accounting for year roll-over
    let currentMonth = startMonth;
    let currentYear = startYear;

    while (currentMonth < 0) {
      currentMonth += 12;
      currentYear -= 1;
    }

    for (let i = monthsToShow - 1; i >= 0; i -= 1) {
      const indexMonth = currentMonth - i;
      let month = indexMonth;
      let year = currentYear;

      // Handle year roll-over
      while (month < 0) {
        month += 12;
        year -= 1;
      }

      while (month >= 12) {
        month -= 12;
        year += 1;
      }

      const date = new Date(year, month, 1);
      const keyMonth = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      months[keyMonth] = { comments: 0, diary: 0, orders: 0 };
    }

    // Count diary comments, diary entries, and orders by month from `activityRecent`
    stats.forEach((stat) => {
      const date = new Date(stat.createdAt);
      const monthKey = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      if (months[monthKey]) {
        if (stat.type === "comment") months[monthKey].comments += 1;
        else if (stat.type === "diary-entry") months[monthKey].diary += 1;
        else if (stat.type === "order") months[monthKey].orders += 1;
      }
    });

    return Object.keys(months).map((label) => ({
      month: label,
      comments: months[label].comments,
      diary: months[label].diary,
      orders: months[label].orders,
    }));
  }, [stats, offsetMonth, monthsToShow]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="space-y-0.5">
            <SubSectionHeading
              as="h2"
              className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
              <BarChart3Icon className="size-6 stroke-[1.5]" />
              Activity Statistics
            </SubSectionHeading>
            {!isPublicProfile ? (
              <Paragraph className="text-base lg:text-base">
                {offsetMonth === 0
                  ? `Your activity over the last ${monthsToShow} months`
                  : `Your activity from ${chartData[0].month} to ${chartData[chartData.length - 1].month}`}
              </Paragraph>
            ) : null}
          </div>
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOffsetMonth((p) => p + monthsToShow)}>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={offsetMonth === 0}
              onClick={() =>
                setOffsetMonth((p) => Math.max(0, p - monthsToShow))
              }>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-10">
          <ChartContainer config={chartConfig} className="h-96 w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="5 5"
                className="stroke-muted/50"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tickFormatter={(value) => value}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tickFormatter={(value) => value.toString()}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="comments"
                name="comments"
                fill={chartConfig.comments.color}
              />
              <Bar
                dataKey="diary"
                name="diary"
                fill={chartConfig.diary.color}
              />
              <Bar
                dataKey="orders"
                name="orders"
                fill={chartConfig.orders.color}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
