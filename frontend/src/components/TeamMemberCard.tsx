import { API_BASE_URL } from "@/lib/api/config";


interface TeamMemberCardProps {
  name: string;
  designation: string;
  photo: string;
}

export const TeamMemberCard = ({ name, designation, photo }: TeamMemberCardProps) => {
  
  return (
    
    <div className="flex flex-col items-center text-center p-3 bg-card rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-2 border-4 border-primary/20 group-hover:border-primary/50 transition-colors shadow-md">
        <img
  src={photo ? `${API_BASE_URL}/${photo}` : "/placeholder.svg"}
  alt={name}
  className="w-full h-full object-cover"
/>

      </div>
      <h3 className="font-semibold text-xs md:text-sm leading-tight">{name}</h3>
      <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 leading-tight">{designation}</p>
    </div>
  );
};
