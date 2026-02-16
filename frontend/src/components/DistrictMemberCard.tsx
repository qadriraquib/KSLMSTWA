import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { API_BASE_URL } from "@/lib/api/config";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface Props {
  name: string;
  designation: string;
  photo: string;
}

export const DistrictMemberCard = ({ name, designation, photo }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <div
        className="group cursor-pointer w-full max-w-[220px]"
        onClick={() => setOpen(true)}
      >
        <div className="relative overflow-hidden rounded-xl shadow-md border bg-white">
          <img
            src={`${API_BASE_URL}/${photo}`}
            alt={name}
            className="
              w-full
              h-[200px]          /* 🔥 Reduced height */
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />

          {/* Hover overlay */}
          <div className="
            absolute inset-0
            bg-black/30
            opacity-0
            group-hover:opacity-100
            transition-opacity
            flex items-center justify-center
          ">
            <ZoomIn className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center mt-3 px-2">
          <h3 className="text-base font-semibold leading-tight">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {designation}
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-2 bg-black">
          <img
            src={`${API_BASE_URL}/${photo}`}
            alt={name}
            className="w-full h-full object-contain rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
