import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    bgColor: string;
    iconColor: string;
    borderColor: string;
};

export const StatsCard = ({ icon: Icon, label, value, bgColor, iconColor, borderColor }: StatsCardProps) => {
    return (
        <Card className="rounded-xl border-4 border-[#0f0e32] bg-[#67beff]/80 transition-colors text-[#0f0e32]/90">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${bgColor} border-3 ${borderColor}`}>
                        <Icon className={`size-6 stroke-3 ${iconColor}`}/>
                    </div>
                    <div>
                        <p className="text-sm">{label}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};